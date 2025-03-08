import React from 'react'
import Image from 'next/image'
import { FaGithub, FaFacebook } from 'react-icons/fa'
import { SiOrcid } from 'react-icons/si'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Phạm Đình Hùng"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Phạm Đình Hùng</h1>
            <p className="text-xl text-gray-300">Software Developer</p>
            <p className="text-gray-400">Hanoi, Vietnam 🇻🇳</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/paulpham157"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://facebook.com/paulpham157"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaFacebook className="w-8 h-8" />
            </a>
            <a
              href="https://orcid.org/0009-0004-5996-1049"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <SiOrcid className="w-8 h-8" />
            </a>
          </div>

          <div className="max-w-2xl text-center space-y-4">
            <h2 className="text-2xl font-semibold">Về tôi</h2>
            <p className="text-gray-300">
              Xin chào! Tôi là một nhà phát triển phần mềm đam mê công nghệ và đổi mới.
              Tôi chuyên về phát triển ứng dụng web và có kinh nghiệm làm việc với nhiều
              công nghệ hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Kỹ năng</h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'Python', 'React', 'Next.js', 'AI/ML', 'DevOps'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Dự án nổi bật</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/paulpham157/agent-q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Agent Q
                  </a>
                  <p className="text-sm text-gray-400">
                    Advanced reasoning and learning for autonomous AI agents
                  </p>
                </li>
                <li>
                  <a
                    href="https://github.com/paulpham157/aura-voice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Aura Voice
                  </a>
                  <p className="text-sm text-gray-400">
                    AI voice assistant optimized for low latency responses
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 