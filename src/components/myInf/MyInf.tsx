'use client';
import { LoadingOutlined } from '@ant-design/icons';
import Image from 'next/image';
import haimin from 'public/haimin.jpg';
import { useEffect, useState } from 'react';

interface IProps {
	className?: string;
}

type VisitorWeatherState = {
	location: string;
	weather: string;
	temperature: string;
	wind: string;
	source: string;
	loading: boolean;
};

type IpApiResponse = {
	city?: string;
	region?: string;
	country_name?: string;
	latitude?: number | string;
	longitude?: number | string;
	timezone?: string;
};

type OpenMeteoResponse = {
	current?: {
		temperature_2m?: number;
		weather_code?: number;
		wind_speed_10m?: number;
		is_day?: number;
	};
};

const DEFAULT_STATE: VisitorWeatherState = {
	location: '正在读取访客位置',
	weather: '天气加载中',
	temperature: '--°C',
	wind: '-- km/h',
	source: 'IP 定位 · Open-Meteo',
	loading: true,
};

function getWeatherLabel(code?: number, isDay?: number) {
	switch (code) {
		case 0:
			return isDay === 0 ? '晴朗夜空' : '晴空';
		case 1:
			return '大致晴朗';
		case 2:
			return '多云间晴';
		case 3:
			return '阴天';
		case 45:
		case 48:
			return '雾';
		case 51:
		case 53:
		case 55:
			return '毛毛雨';
		case 56:
		case 57:
			return '冻毛毛雨';
		case 61:
		case 63:
		case 65:
			return '降雨';
		case 66:
		case 67:
			return '冻雨';
		case 71:
		case 73:
		case 75:
			return '降雪';
		case 77:
			return '雪粒';
		case 80:
		case 81:
		case 82:
			return '阵雨';
		case 85:
		case 86:
			return '阵雪';
		case 95:
			return '雷暴';
		case 96:
		case 99:
			return '雷暴冰雹';
		default:
			return '天气未知';
	}
}

function formatLocation(data: IpApiResponse) {
	return [data.city, data.region, data.country_name].filter(Boolean).join(' · ') || '未知位置';
}

export default function MyInf(props: IProps) {
	const { className } = props;
	const [visitorWeather, setVisitorWeather] = useState<VisitorWeatherState>(DEFAULT_STATE);

	useEffect(() => {
		const controller = new AbortController();

		const loadVisitorWeather = async () => {
			try {
				const ipResponse = await fetch('https://ipapi.co/json/', {
					signal: controller.signal,
				});
				if (!ipResponse.ok) {
					throw new Error('IP 定位失败');
				}

				const ipData: IpApiResponse = await ipResponse.json();
				const latitude = Number(ipData.latitude);
				const longitude = Number(ipData.longitude);
				if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
					throw new Error('无效坐标');
				}

				const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
				weatherUrl.searchParams.set('latitude', String(latitude));
				weatherUrl.searchParams.set('longitude', String(longitude));
				weatherUrl.searchParams.set('current', 'temperature_2m,weather_code,wind_speed_10m,is_day');
				weatherUrl.searchParams.set('timezone', ipData.timezone || 'auto');

				const weatherResponse = await fetch(weatherUrl.toString(), {
					signal: controller.signal,
				});
				if (!weatherResponse.ok) {
					throw new Error('天气拉取失败');
				}

				const weatherData: OpenMeteoResponse = await weatherResponse.json();
				const current = weatherData.current;
				const temperature = typeof current?.temperature_2m === 'number' ? `${Math.round(current.temperature_2m)}°C` : '--°C';
				const wind = typeof current?.wind_speed_10m === 'number' ? `${Math.round(current.wind_speed_10m)} km/h` : '-- km/h';
				const weather = getWeatherLabel(current?.weather_code, current?.is_day);

				setVisitorWeather({
					location: formatLocation(ipData),
					weather,
					temperature,
					wind,
					source: 'IP 定位 · Open-Meteo',
					loading: false,
				});
			} catch (error) {
				if (controller.signal.aborted) return;

				setVisitorWeather({
					location: '访客天气暂不可用',
					weather: '稍后再试',
					temperature: '--°C',
					wind: '-- km/h',
					source: 'IP 定位 · Open-Meteo',
					loading: false,
				});
			}
		};

		loadVisitorWeather();

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<div
			className={`bg-custom-color-9 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9 flex h-24 w-full items-center gap-3 rounded-xl p-3 shadow-md ${className || ''}`}
		>
			<Image alt="用户头像" src={haimin} width={56} height={56} className="rounded-3xl" />
			<div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
				<p className="truncate text-sm font-bold">haimin</p>
				<p className="truncate text-xs opacity-75">{visitorWeather.location}</p>
				<div className="flex items-center gap-2 text-xs opacity-75">
					{visitorWeather.loading ? <LoadingOutlined /> : null}
					<span className="truncate">
						{visitorWeather.weather} · {visitorWeather.temperature} · {visitorWeather.wind}
					</span>
				</div>
				<p className="truncate text-[11px] opacity-60">{visitorWeather.source}</p>
			</div>
		</div>
	);
}
