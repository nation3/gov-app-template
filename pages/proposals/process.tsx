import type { NextPage } from 'next'
import Link from 'next/link'
import { Card } from 'flowbite-react'
import markdownIt from 'markdown-it'
import { useState, useEffect } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/outline'

const renderMarkdown = async (markdown: string) => {
  // @ts-ignore
  const MarkdownItMermaid = (await import('@md-reader/markdown-it-mermaid'))
    .default

  const mdi = markdownIt()
  mdi.use(MarkdownItMermaid)
  return mdi.render(markdown)
}

const Process: NextPage = ({ markdown }: any) => {
  const [html, setHTML] = useState('')
  useEffect(() => {
    renderMarkdown(markdown).then((htmlContent) => {
      setHTML(htmlContent)
    })
  }, [markdown])

  return (
    <div className="flex flex-col w-full xl:max-w-5xl">
      <div className="flex flex-row justify-between">
        <Link href="/proposals">
          <a className="ml-2 mb-2 cursor-pointer text-n3blue hover:underline">
            ← All proposals
          </a>
        </Link>
        <a
          className="mr-2 mb-2 cursor-pointer text-n3blue hover:underline"
          href="https://github.com/nation3/gov"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex flex-row items-center gap-1">
            <span>View on GitHub</span>
            <ExternalLinkIcon className="w-5 h-5" />
          </div>
        </a>
      </div>
      <Card>
        <div
          className="prose dark:prose-invert prose-h1:font-display prose-h1:font-normal prose-pre:bg-transparent max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </Card>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(
    `https://raw.githubusercontent.com/nation3/gov/main/GOVERNANCE.md`
  )

  const markdown = await res.text()

  return {
    props: { markdown },
    revalidate: 60 * 60 * 24,
  }
}

export default Process
