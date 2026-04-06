import { useState } from 'react';
import { Rss, Copy, Check, ExternalLink, Download, FileText, Code } from 'lucide-react';

export default function AdminGoogleFeedPage() {
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const xmlFeedUrl = `${supabaseUrl}/functions/v1/google-shopping-feed`;
  const jsonFeedUrl = `${supabaseUrl}/functions/v1/google-shopping-feed?format=json`;

  function copyToClipboard(text: string, type: 'xml' | 'json') {
    navigator.clipboard.writeText(text);
    if (type === 'xml') {
      setCopiedXml(true);
      setTimeout(() => setCopiedXml(false), 2000);
    } else {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Google Shopping Feed</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate and access your product feed for Google Merchant Center
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
              <Rss className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">XML Feed (RSS 2.0)</h2>
              <p className="text-sm text-gray-500">
                Standard format for Google Merchant Center
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <FileText className="h-4 w-4 shrink-0 text-gray-400" />
            <code className="flex-1 truncate text-sm text-gray-700">{xmlFeedUrl}</code>
            <button
              onClick={() => copyToClipboard(xmlFeedUrl, 'xml')}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
            >
              {copiedXml ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="mt-3 flex gap-3">
            <a
              href={xmlFeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" />
              Preview Feed
            </a>
            <a
              href={xmlFeedUrl}
              download="google-shopping-feed.xml"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download XML
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Code className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">JSON Feed</h2>
              <p className="text-sm text-gray-500">
                Alternative format for custom integrations
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <FileText className="h-4 w-4 shrink-0 text-gray-400" />
            <code className="flex-1 truncate text-sm text-gray-700">{jsonFeedUrl}</code>
            <button
              onClick={() => copyToClipboard(jsonFeedUrl, 'json')}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
            >
              {copiedJson ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="mt-3">
            <a
              href={jsonFeedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4" />
              Preview JSON
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="text-base font-semibold text-gray-900">How to use with Google Merchant Center</h3>
          <ol className="mt-4 space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">1</span>
              <span>Sign in to your <strong>Google Merchant Center</strong> account</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">2</span>
              <span>Navigate to <strong>Products &gt; Feeds</strong> and click <strong>Add feed</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">3</span>
              <span>Select <strong>Scheduled fetch</strong> as the feed type</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">4</span>
              <span>Paste the <strong>XML Feed URL</strong> above as the file URL</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">5</span>
              <span>Set the fetch frequency (daily recommended) and save</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
