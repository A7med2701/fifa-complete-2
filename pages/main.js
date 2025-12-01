import Link from 'next/link'
export default function Main(){
  return (
    <div className="container">
      <header className="header">
        <a className="btn" href="https://discord.gg/fZtTmwAgs2" target="_blank" rel="noreferrer">Server Link</a>
        <div>
          <Link href='/tournament'><a className="btn">Tournament</a></Link>
          <Link href='/server'><a className="btn">Server</a></Link>
        </div>
      </header>
      <main className="card">
        <h2>Welcome to FIFA LIGHT</h2>
        <p className="small">Server: 1364988211369218078</p>
      </main>
    </div>
  )
}
