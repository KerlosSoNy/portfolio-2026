import ContactSection from '@/components/shared/ContactSection'
import { LetsWorkTogether } from '@/components/shared/LetsTalk'

export default function Page() {
    return (
        <main className="relative gap-6 flex min-h-screen w-screen max-w-screen flex-col items-center justify-center overflow-x-hidden font-sans">
            <ContactSection />
            <LetsWorkTogether />
        </main>
    )
}
