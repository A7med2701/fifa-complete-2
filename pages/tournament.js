import {useEffect,useState} from 'react'
export default function Tournament(){
  const [teams,setTeams]=useState([])
  const [players,setPlayers]=useState([])
  const [matches,setMatches]=useState([])
  const [adminKey,setAdminKey]=useState('')
  const [isAdmin,setIsAdmin]=useState(false)
  const [countdown,setCountdown]=useState(null)
  useEffect(()=>{
    fetch('/data/teams.json').then(r=>r.json()).then(j=>setTeams(j)).catch(()=>{})
    fetch('/data/players.json').then(r=>r.json()).then(j=>setPlayers(j)).catch(()=>{})
    fetch('/data/matches.json').then(r=>r.json()).then(j=>setMatches(j)).catch(()=>{})
    const saved = localStorage.getItem('fifalight_data')
    if(saved){
      const d = JSON.parse(saved)
      if(d.teams) setTeams(d.teams)
      if(d.players) setPlayers(d.players)
      if(d.matches) setMatches(d.matches)
    }
  },[])

  function saveLocal(t,p,m){
    const d = {teams:t||teams, players:p||players, matches:m||matches}
    localStorage.setItem('fifalight_data', JSON.stringify(d))
    alert('Saved locally for this browser (Admin edits).')
  }

  function tryAdmin(){
    if(adminKey==='1364997289910997023' || adminKey==='1364988211369218078') setIsAdmin(true)
    else alert('Wrong admin key')
  }

  function addTeam(){
    const name = prompt('Team name')
    if(!name) return
    const id = Date.now()
    const logo = '/0b4a32ca-f03a-49b3-adc8-000649410815.png'
    const t = [...teams, {id,name,logo,captain:'',played:0,goalsFor:0,goalsAgainst:0,points:0}]
    setTeams(t); saveLocal(t,null,null)
  }

  function addPlayer(){
    const name = prompt('Player name'); if(!name) return
    const pos = prompt('Position (ST,CM,CDM,GK,CDM etc)') || 'ST'
    const teamId = parseInt(prompt('Team ID')) || teams[0]?.id || 0
    const id = Date.now()
    const p = [...players,{id,name,position:pos,teamId,goals:0,assists:0,saves:0}]
    setPlayers(p); saveLocal(null,p,null)
  }

  function editPlayerStats(pid){
    const p = players.find(x=>x.id===pid); if(!p) return
    const goals = parseInt(prompt('Goals', p.goals))||0
    const assists = parseInt(prompt('Assists', p.assists))||0
    const saves = parseInt(prompt('Goalkeeping (saves/clean sheets)', p.saves))||0
    const np = players.map(x=> x.id===pid ? {...x, goals, assists, saves} : x)
    setPlayers(np); saveLocal(null,np,null)
  }

  function computeRanking(){
    return [...teams].sort((a,b)=>{
      if(b.points!==a.points) return b.points-a.points
      const gdA = a.goalsFor - a.goalsAgainst
      const gdB = b.goalsFor - b.goalsAgainst
      if(gdB!==gdA) return gdB-gdA
      return b.goalsFor - a.goalsFor
    })
  }

  function runTOS(){
    setCountdown(3)
    let n=3
    const iv = setInterval(()=>{ n--; if(n<=0){ clearInterval(iv); setCountdown('GO'); setTimeout(()=>setCountdown(null),2500)} else setCountdown(n) },800)
  }

  return (
    <div className="container">
      <a href="/main" className="small">← Back</a>
      <div className="header"><h1>Tournament — Prize: 7k Robux</h1>
      <div>
        <input placeholder="Admin key" value={adminKey} onChange={e=>setAdminKey(e.target.value)} />
        <button className="btn" onClick={tryAdmin}>Enter Admin</button>
      </div>
      </div>

      <div style={{marginBottom:10}}>
        {isAdmin && <div className="admin-box">
          <button className="btn" onClick={addTeam}>Add Team</button>
          <button className="btn" onClick={addPlayer}>Add Player</button>
          <button className="btn" onClick={()=>saveLocal(null,null,null)}>Save Now</button>
        </div>}
      </div>

      <div className="grid card">
        <div className="left-panel">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3>Matches</h3>
            <div className="small">🇬🇧 🇪🇬 🇸🇦</div>
          </div>
          {matches.map(m=>(
            <div key={m.id} className="match-row"><div><strong>{teams.find(t=>t.id===m.teamA)?.name||m.teamA}</strong> vs <strong>{teams.find(t=>t.id===m.teamB)?.name||m.teamB}</strong></div><div className="small">{m.time} • {m.score}</div></div>
          ))}
        </div>

        <div className="right-panel">
          <h3>Ranking</h3>
          {computeRanking().map((t,i)=>(
            <div key={t.id} style={{marginBottom:6}}>
              <strong>#{i+1} {t.name}</strong>
              <div className="small">P:{t.played} • GD:{t.goalsFor - t.goalsAgainst} • Points:{t.points}</div>
            </div>
          ))}

          <h4 style={{marginTop:10}}>Players (Top by Role)</h4>
          {['ST','CM','CDM','GK','RW','LW'].map(role=>(
            <div key={role} style={{marginTop:6}}>
              <strong>{role}</strong>
              {players.filter(p=>p.position===role).slice(0,15).map(p=>(
                <div key={p.id} className="player-row">
                  <div>{p.name}</div>
                  <div className="small">G:{p.goals} A:{p.assists} S:{p.saves}</div>
                  {isAdmin && <button className="btn" onClick={()=>editPlayerStats(p.id)} style={{marginLeft:8}}>Edit</button>}
                </div>
              ))}
            </div>
          ))}

          <div style={{marginTop:12}}>
            <button className="btn" onClick={runTOS}>Ready for Team of the Season?</button>
            {countdown && <div className="countdown">{countdown}</div>}
            {countdown==='GO' && <div className="fireworks">🎆 Best Team of the Season!</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
