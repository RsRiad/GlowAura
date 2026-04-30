'use client'

import Loading from "@/components/Loading"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoadingPage() {
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const url = params.get('nextUrl')

        if (url && url.startsWith('/') && !url.includes('://')) {
            setTimeout(() => {
                router.push(url)
            }, 5000) // Reduced to 5s for better UX, still safe
        } else {
            router.push('/')
        }
    }, [router])

    return <Loading />
}
