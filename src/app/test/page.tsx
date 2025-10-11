'use client';
import { useState, useRef, useEffect } from 'react';

interface Patient {
	id: string;
	name: string;
	startDate: string; // YYYY-MM-DD
	startTime: string; // HH:mm
	interval: number; // 分钟
	color: string;
}

interface ScheduleItem {
	id: string;
	patientId: string;
	patientName: string;
	dateTime: string; // ISO 格式（用于排序）
	date: string; // YYYY-MM-DD（本地时间）
	time: string; // HH:mm 格式（本地时间）
	displayTime: string; // 显示格式 18:00
	originalStartDate: string;
	originalStartTime: string;
	interval: number;
	color: string;
}

// 丰富的颜色列表
const COLOR_PALETTE = [
	'#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
	'#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
	'#14B8A6', '#EAB308', '#DC2626', '#65A30D', '#7C3AED',
	'#DB2777', '#0D9488', '#EA580C', '#4338CA', '#BE123C',
	'#0F766E', '#B45309', '#3730A3', '#9D174D', '#134E4A',
	'#92400E', '#312E81', '#831843', '#115E59', '#78350F',
	'#1E40AF', '#9F1239', '#0E7490', '#854D0E', '#1E1B4B',
	'#701A75', '#164E63', '#713F12', '#312E81', '#500724',
	'#1A365D', '#3C096C', '#00509D', '#6A040F', '#3A0CA3',
	'#7209B7', '#560BAD', '#480CA8', '#3A0CA3', '#4CC9F0'
];

// 间隔时间选项
const INTERVAL_OPTIONS = [
	{ value: '240', label: 'q4h (4小时)' },
	{ value: '360', label: 'q6h (6小时)' },
	{ value: '480', label: 'q8h (8小时)' }
];

export default function ScheduleSystem() {
	const formRef = useRef<HTMLDivElement>(null);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
	const [formData, setFormData] = useState({
		name: '',
		startDate: '',
		startTime: '18:00', // 默认18:00
		interval: '240', // 默认q4h
	});
	const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

	// 获取今天的日期字符串（本地时间）
	const getTodayDateString = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份0-11，需+1
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	// 获取下一个可用的颜色
	const getNextColor = (): string => {
		const usedColors = patients.map(p => p.color);
		const availableColor = COLOR_PALETTE.find(color => !usedColors.includes(color));
		return availableColor || COLOR_PALETTE[patients.length % COLOR_PALETTE.length];
	};

	// 从localStorage加载数据
	useEffect(() => {
		const savedPatients = localStorage.getItem('schedule-patients');
		const savedScheduleItems = localStorage.getItem('schedule-items');

		if (savedPatients) {
			setPatients(JSON.parse(savedPatients));
		}
		if (savedScheduleItems) {
			setScheduleItems(JSON.parse(savedScheduleItems));
		}
	}, []);

	// 设置默认开始日期为今天（本地时间）
	useEffect(() => {
		if (!formData.startDate) {
			setFormData(prev => ({
				...prev,
				startDate: getTodayDateString()
			}));
		}
	}, []);

	// 保存数据到localStorage
	useEffect(() => {
		localStorage.setItem('schedule-patients', JSON.stringify(patients));
	}, [patients]);

	useEffect(() => {
		localStorage.setItem('schedule-items', JSON.stringify(scheduleItems));
	}, [scheduleItems]);

	// 修复核心：基于本地时间生成排班项，彻底解决时区偏差
	const generateScheduleItems = (patient: Patient): ScheduleItem[] => {
		const items: ScheduleItem[] = [];
		const intervalMs = patient.interval * 60 * 1000; // 转换为毫秒

		// 解析患者的开始时间（本地时间）
		const [startYear, startMonth, startDay] = patient.startDate.split('-').map(Number);
		const [startHour, startMinute] = patient.startTime.split(':').map(Number);
		// 注意：Date的月份是0-11，所以startMonth需要-1
		let currentDateTime = new Date(startYear, startMonth - 1, startDay, startHour, startMinute);

		// 生成6个排班项（覆盖24小时周期）
		for (let index = 0; index < 6; index++) {
			// 1. 获取本地时间的年/月/日（解决时区问题的关键）
			const year = currentDateTime.getFullYear();
			const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // 转回1-12月
			const day = String(currentDateTime.getDate()).padStart(2, '0');
			const dateString = `${year}-${month}-${day}`;

			// 2. 获取本地时间的时/分
			const hour = String(currentDateTime.getHours()).padStart(2, '0');
			const minute = String(currentDateTime.getMinutes()).padStart(2, '0');
			const timeString = `${hour}:${minute}`;

			// 3. 保留ISO格式时间（仅用于排序，不用于显示）
			const dateTimeISO = currentDateTime.toISOString();

			items.push({
				id: `${patient.id}-${index}`,
				patientId: patient.id,
				patientName: patient.name,
				dateTime: dateTimeISO, // 用于排序
				date: dateString, // 本地时间日期（用于显示）
				time: timeString, // 本地时间（用于显示）
				displayTime: timeString,
				originalStartDate: patient.startDate,
				originalStartTime: patient.startTime,
				interval: patient.interval,
				color: patient.color
			});

			// 更新时间：基于本地时间加间隔（自动处理跨天）
			currentDateTime = new Date(currentDateTime.getTime() + intervalMs);
		}

		return items;
	};

	// 格式化日期时间显示（纯本地时间）
	const formatDateTime = (dateString: string, timeString: string) => {
		const [year, month, day] = dateString.split('-').map(Number);
		// 注意：Date的月份是0-11
		const date = new Date(year, month - 1, day);
		// 用toLocaleDateString直接获取本地日期格式（如"10月11日 周六"）
		const localDate = date.toLocaleDateString('zh-CN', {
			month: '2-digit',
			day: '2-digit',
			weekday: 'short'
		}).replace('/', '月').replace('/', '日');
		return `${localDate} ${timeString}`;
	};

	// 添加病人并生成排班
	const addPatient = () => {
		if (!formData.name || !formData.startDate || !formData.startTime || !formData.interval) {
			alert('请填写所有必填字段');
			return;
		}

		const interval = parseInt(formData.interval);
		if (interval <= 0) {
			alert('间隔时长必须大于0');
			return;
		}

		const newPatient: Patient = {
			id: Date.now().toString(),
			name: formData.name,
			startDate: formData.startDate,
			startTime: formData.startTime,
			interval: interval,
			color: getNextColor()
		};

		const newPatients = [...patients, newPatient];
		setPatients(newPatients);

		// 生成新排班项（本地时间逻辑）
		const newScheduleItems = generateScheduleItems(newPatient);

		// 合并并按ISO时间排序（确保全局顺序正确）
		const allItems = [...scheduleItems, ...newScheduleItems].sort((a, b) => {
			return a.dateTime.localeCompare(b.dateTime);
		});

		setScheduleItems(allItems);

		// 重置表单
		setFormData(prev => ({
			...prev,
			name: ''
		}));
	};

	// 删除病人及其所有项
	const deletePatient = (patientId: string) => {
		const newPatients = patients.filter(p => p.id !== patientId);
		const newScheduleItems = scheduleItems.filter(item => item.patientId !== patientId);

		setPatients(newPatients);
		setScheduleItems(newScheduleItems);
		setDeleteConfirm(null);
	};

	// 清空所有数据
	const clearAllData = () => {
		if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
			setPatients([]);
			setScheduleItems([]);
			localStorage.removeItem('schedule-patients');
			localStorage.removeItem('schedule-items');
		}
	};

	// 按日期时间分组排班项（基于本地时间）
	const getGroupedScheduleItems = () => {
		const groups: Record<string, ScheduleItem[]> = {};

		scheduleItems.forEach(item => {
			const key = `${item.date}T${item.time}`; // 本地时间的日期+时间作为分组键
			if (!groups[key]) {
				groups[key] = [];
			}
			groups[key].push(item);
		});

		// 按分组键排序（确保时间顺序正确）
		return Object.entries(groups).sort(([keyA], [keyB]) => {
			return keyA.localeCompare(keyB);
		});
	};

	const groupedScheduleItems = getGroupedScheduleItems();

	return (
		<div ref={formRef} className="flex h-full flex-col p-6 max-md:p-4">
			{/* 添加病人表单 */}
			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">添加病人</h2>
					{patients.length > 0 && (
						<button
							onClick={clearAllData}
							className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
						>
							清空所有数据
						</button>
					)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							病人姓名 *
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="输入病人姓名"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							开始日期 *
						</label>
						<input
							type="date"
							value={formData.startDate}
							onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							开始时间 *
						</label>
						<input
							type="time"
							value={formData.startTime}
							onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							间隔时长 *
						</label>
						<select
							value={formData.interval}
							onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							{INTERVAL_OPTIONS.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>

				<button
					onClick={addPatient}
					className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
				>
					添加
				</button>
			</div>

			{/* 病人列表 */}
			{patients.length > 0 && (
				<div className="bg-white rounded-lg shadow-md p-4 mb-4">
					<h2 className="text-sm font-bold mb-4">病人列表 ({patients.length}人)</h2>
					<div className="flex flex-wrap gap-3">
						{patients.map(patient => (
							<div key={patient.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg">
								<div
									className="w-4 h-4 rounded-full"
									style={{ backgroundColor: patient.color }}
								/>
								<span
									className="text-sm font-medium whitespace-nowrap"
									style={{ color: patient.color }}
								>
									{patient.name}
								</span>
								<span className="text-xs text-gray-600">
									{formatDateTime(patient.startDate, patient.startTime)}
								</span>
								<span className="text-xs text-gray-600">
									{INTERVAL_OPTIONS.find(opt => opt.value === patient.interval.toString())?.label.split(' ')[0]}
								</span>
								<button
									onClick={() => setDeleteConfirm(patient.id)}
									className="text-red-500 hover:text-red-700 text-xs p-1 rounded hover:bg-red-50"
								>
									删除
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{/* 时间表 */}
			<div className="bg-white rounded-lg shadow-md p-6 flex-1">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">时间表</h2>
					<div className="text-sm text-gray-500">
						共 {scheduleItems.length} 个项
					</div>
				</div>

				{scheduleItems.length === 0 ? (
					<div className="text-center text-gray-500 py-8">
						暂无数据，请添加病人
					</div>
				) : (
					<div className="space-y-3 max-h-[600px] overflow-y-auto">
						{groupedScheduleItems.map(([key, items]) => {
							const firstItem = items[0];
							const dateTimeDisplay = formatDateTime(firstItem.date, firstItem.time);

							return (
								<div key={key} className="flex items-center space-x-6 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
									<div className="w-40">
										<span className="text-lg font-bold text-gray-800">
											{dateTimeDisplay}
										</span>
									</div>
									<div className="flex flex-wrap gap-4 flex-1">
										{items.map(item => (
											<div key={item.id} className="flex items-center space-x-2">
												<div
													className="w-4 h-4 rounded-full"
													style={{ backgroundColor: item.color }}
												/>
												<span
													className="text-lg font-medium"
													style={{ color: item.color }}
												>
													{item.patientName}
												</span>
											</div>
										))}
									</div>
									<div className="text-sm text-gray-500">
										{items.length} 个患者
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>

			{/* 删除确认对话框 */}
			{deleteConfirm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full">
						<h3 className="text-lg font-bold mb-2">确认删除</h3>
						<p className="text-gray-600 mb-4">确定要删除这个病人及其所有排班项吗？此操作不可撤销。</p>
						<div className="flex space-x-3">
							<button
								onClick={() => {
									deletePatient(deleteConfirm);
								}}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1"
							>
								确认删除
							</button>
							<button
								onClick={() => setDeleteConfirm(null)}
								className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded flex-1"
							>
								取消
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}