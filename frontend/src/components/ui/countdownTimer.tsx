"use client";
import { useCountdown } from "../utils/countdown";


export default function CountdownTimer({ startDate, endDate }: { startDate: string | Date, endDate: string | Date }) {

    const { days, hours, minutes, seconds } = useCountdown(startDate, endDate);

    return (
        <div className="flex flex-row items-center space-x-2">
            <div className="flex items-center space-x-1 flex-col">
                <span className="text-2xl font-medium text-gray-900">{days}</span>
                <span className="text-xs font-medium text-gray-500">days</span>
            </div>
            <div className="flex items-center space-x-1 flex-col">
                <span className="text-2xl font-medium text-gray-900">{hours}</span>
                <span className="text-xs font-medium text-gray-500">hours</span>
            </div>
            <div className="flex items-center space-x-1 flex-col">
                <span className="text-2xl font-medium text-gray-900">{minutes}</span>
                <span className="text-xs font-medium text-gray-500">minutes</span>
            </div>
            <div className="flex items-center space-x-1 flex-col">
                <span className="text-2xl font-medium text-gray-900">{seconds}</span>
                <span className="text-xs font-medium text-gray-500">seconds</span>
            </div>
        </div>
    );
}