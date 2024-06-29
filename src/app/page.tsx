import DigitalClock from '@/components/digitalClock/DigitalClock';

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-between p-24">
            <DigitalClock></DigitalClock>
        </main>
    );
}
