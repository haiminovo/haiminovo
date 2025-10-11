'use client';
import { useState, useRef, useEffect } from 'react';

interface Patient {
	id: string;
	name: string;
	startDate: string; // YYYY-MM-DD
	startTime: string; // HH:mm
	interval: number; // 分钟
	note: string;
	color: string; // 新增颜色字段
}

interface ScheduleItem {
	id: string;
	patientId: string;
	patientName: string;
	dateTime: string; // ISO 格式
	date: string; // YYYY-MM-DD
	time: string; // HH:mm
	note: string;
	originalStartDate: string;
	originalStartTime: string;
	interval: number;
	color: string; // 新增颜色字段
}

// 预定义的颜色列表
const COLOR_PALETTE = [
	'#3B82F6', // blue-500
	'#EF4444', // red-500
	'#10B981', // emerald-500
	'#F59E0B', // amber-500
	'#8B5CF6', // violet-500
	'#EC4899', // pink-500
	'#06B6D4', // cyan-500
	'#84CC16', // lime-500
	'#F97316', // orange-500
	'#6366F1', // indigo-500
	'#14B8A6', // teal-500
	'#EAB308', // yellow-500
];

export default function ScheduleSystem() {
	const formRef = useRef<HTMLDivElement>(null);
	const [patients, setPatients] = useState<Patient[]>([]);
	const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
	const [formData, setFormData] = useState({
		name: '',
		startDate: '',
		startTime: '',
		interval: '',
		note: ''
	});
	const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

	// 保存数据到localStorage
	useEffect(() => {
		localStorage.setItem('schedule-patients', JSON.stringify(patients));
	}, [patients]);

	useEffect(() => {
		localStorage.setItem('schedule-items', JSON.stringify(scheduleItems));
	}, [scheduleItems]);

	// 生成从开始时间起24小时内的项
	const generateScheduleItems = (patient: Patient): ScheduleItem[] => {
		const items: ScheduleItem[] = [];

		// 解析开始日期时间
		const startDateTime = new Date(`${patient.startDate}T${patient.startTime}`);
		const intervalMs = patient.interval * 60 * 1000; // 转换为毫秒
		const endTime = new Date(startDateTime.getTime() + 24 * 60 * 60 * 1000); // 开始时间后24小时

		let currentTime = startDateTime.getTime();
		let index = 0;

		while (currentTime < endTime.getTime()) {
			const date = new Date(currentTime);
			const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
			const timeString = date.toTimeString().slice(0, 5); // HH:mm
			const dateTimeString = date.toISOString();

			items.push({
				id: `${patient.id}-${index}`,
				patientId: patient.id,
				patientName: patient.name,
				dateTime: dateTimeString,
				date: dateString,
				time: timeString,
				note: patient.note,
				originalStartDate: patient.startDate,
				originalStartTime: patient.startTime,
				interval: patient.interval,
				color: patient.color
			});

			currentTime += intervalMs;
			index++;
		}

		return items;
	};

	// 格式化日期显示
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('zh-CN', {
			month: '2-digit',
			day: '2-digit',
			weekday: 'short'
		}).replace('/', '月').replace('/', '月');
	};

	// 获取时间显示标签（上午/下午）
	const getTimeLabel = (time: string) => {
		const [hours] = time.split(':').map(Number);
		return hours < 12 ? '上午' : hours < 18 ? '下午' : '晚上';
	};

	// 添加病人并生成
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
			note: formData.note,
			color: getNextColor()
		};

		const newPatients = [...patients, newPatient];
		setPatients(newPatients);

		// 为新病人生成项
		const newScheduleItems = generateScheduleItems(newPatient);

		// 合并所有项并按日期时间排序
		const allItems = [...scheduleItems, ...newScheduleItems].sort((a, b) => {
			return a.dateTime.localeCompare(b.dateTime);
		});

		setScheduleItems(allItems);

		// 重置表单
		setFormData({
			name: '',
			startDate: '',
			startTime: '',
			interval: '',
			note: ''
		});
	};

	// 删除病人及其所有项
	const deletePatient = (patientId: string) => {
		const newPatients = patients.filter(p => p.id !== patientId);
		const newScheduleItems = scheduleItems.filter(item => item.patientId !== patientId);

		setPatients(newPatients);
		setScheduleItems(newScheduleItems);
		setDeleteConfirm(null);
	};

	// 删除单个项
	const deleteScheduleItem = (itemId: string) => {
		const newScheduleItems = scheduleItems.filter(item => item.id !== itemId);
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

	// 按日期分组项
	const groupedScheduleItems = scheduleItems.reduce((groups, item) => {
		const date = item.date;
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(item);
		return groups;
	}, {} as Record<string, ScheduleItem[]>);

	// 获取今天的日期字符串
	const getTodayDateString = () => {
		return new Date().toISOString().split('T')[0];
	};

	// 设置默认开始日期为今天
	useEffect(() => {
		if (!formData.startDate) {
			setFormData(prev => ({
				...prev,
				startDate: getTodayDateString()
			}));
		}
	}, []);

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

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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
							间隔时长 (分钟) *
						</label>
						<input
							type="number"
							value={formData.interval}
							onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="例如：30"
							min="1"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							备注
						</label>
						<input
							type="text"
							value={formData.note}
							onChange={(e) => setFormData({ ...formData, note: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="备注信息"
						/>
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
					<h2 className="text-xl font-bold mb-4">病人列表 ({patients.length}人)</h2>
					<div className="space-y-3">
						{patients.map(patient => (
							<div key={patient.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
								<div className="flex items-center space-x-3">
									<div
										className="w-4 h-4 rounded-full"
										style={{ backgroundColor: patient.color }}
									/>
									<span className="font-medium">{patient.name}</span>
									<span className="text-gray-600">
										{formatDate(patient.startDate)} {patient.startTime}
									</span>
									<span className="text-gray-600">间隔: {patient.interval}分钟</span>
									{patient.note && (
										<span className="text-gray-500">备注: {patient.note}</span>
									)}
								</div>
								<button
									onClick={() => setDeleteConfirm(patient.id)}
									className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs whitespace-nowrap"
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
					<div className="space-y-6 max-h-[600px] overflow-y-auto">
						{Object.entries(groupedScheduleItems)
							.sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
							.map(([date, items]) => (
								<div key={date} className="border border-gray-200 rounded-lg">
									<div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
										<h3 className="font-semibold text-gray-800">
											{formatDate(date)}
										</h3>
									</div>
									<div className="space-y-2 p-2">
										{items.map(item => (
											<div
												key={item.id}
												className="flex items-center justify-between p-1 rounded-lg hover:bg-gray-50 border-l-2 border"
												style={{ borderLeftColor: item.color }}
											>
												<div className="flex items-center space-x-1 w-full gap-2">
													<div className="flex items-center space-x-1">
														<span className="text-xs text-gray-400">
															{getTimeLabel(item.time)}
														</span>
														<span
															className="font-mono text-white px-3 py-1 rounded  text-xs text-center font-semibold"
															style={{ backgroundColor: item.color }}
														>
															{item.time}
														</span>
													</div>
													<div className="flex items-center space-x-1">
														<div className='flex flex-col justify-center flex-1 gap-2 items-center'>
															<span className="font-medium ">{item.patientName}</span>
															<div className="text-xs text-gray-500">
																{item.originalStartDate} {item.originalStartTime}
															</div>
															<div className="text-xs text-gray-500">
																每 {item.interval}分钟
															</div>
														</div>
													</div>
													{item.note && (
														<span className="text-gray-500 text-sm">{item.note}</span>
													)}
												</div>
												<button
													onClick={() => setDeleteConfirm(item.id)}
													className="text-red-500 hover:text-red-700 text-xs whitespace-nowrap p-1 rounded hover:bg-red-50"
												>
													删除
												</button>
											</div>
										))}
									</div>
								</div>
							))}
					</div>
				)}
			</div>

			{/* 删除确认对话框 */}
			{deleteConfirm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full">
						<h3 className="text-lg font-bold mb-2">确认删除</h3>
						<p className="text-gray-600 mb-4">确定要删除这个项目吗？此操作不可撤销。</p>
						<div className="flex space-x-3">
							<button
								onClick={() => {
									if (deleteConfirm.includes('-')) {
										deleteScheduleItem(deleteConfirm);
									} else {
										deletePatient(deleteConfirm);
									}
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