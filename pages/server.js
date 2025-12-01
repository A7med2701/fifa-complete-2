import Link from 'next/link'
export default function Server(){
  return (
    <div className="container">
      <a href="/main" className="small">← Back</a>
      <main className="card">
        <h1>Server Rules</h1>
        <ol>
          <li>All members must respect each other. Disrespect is not allowed.</li>
          <li>All types of insults are forbidden in text or voice channels.</li>
          <li>Voice changers are not allowed.</li>
          <li>Any form of racism is strictly prohibited (ban punishment).</li>
          <li>Advertising of any kind is forbidden (DM or public).</li>
          <li>No political discussions of any kind (permanent ban).</li>
        </ol>
      </main>
    </div>
  )
}
