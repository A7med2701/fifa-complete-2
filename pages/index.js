import {useEffect} from 'react'
import {useRouter} from 'next/router'
export default function Index(){
  const router = useRouter();
  useEffect(()=>{
    const lang = localStorage.getItem('fifalight_lang');
    if(lang) router.push('/main');
  },[]);
  function setLang(l){localStorage.setItem('fifalight_lang',l);router.push('/main');}
  return (
    <div className="center">
      <div className="card" style={{textAlign:'center'}}>
        <img src="/fifa.png" alt="fifa" className="logoSmall" />
        <h2>Choose Language / اختر اللغة</h2>
        <div className="langBtns">
          <button className="btn" onClick={()=>setLang('en')}>English</button>
          <button className="btn" onClick={()=>setLang('ar')}>العربية</button>
        </div>
      </div>
    </div>
  )
}
