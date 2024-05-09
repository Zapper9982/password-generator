
import { useState , useCallback , useEffect , useRef} from 'react'



function App() {
  const [length,Setlength] = useState(8)
  const [numall , setnumall ] = useState(false)
  const [charall , setcharall ] = useState(false)
  const [pass , setpass ] = useState("")

  //user referene hook 

  const passref = useRef(null)

  const passgen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numall) str += "0123456789"
    if(charall) str += "!@#$%^&*()_+"
    for(let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
     
    }
    setpass(pass)
  } , [length,numall,charall,setpass])

  const copymethod = useCallback(() => {
    passref.current.select()
    window.navigator.clipboard.writeText(pass)
  } , [pass])

  useEffect(() => {
    passgen()
  },[length,numall,charall,passgen])
  return (
   
 <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500'>
  <h1 className='text-2xl text-center mb-4 text-white'>Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
   <input type="text"
   value={pass}
   className='outline-none w-full py-1 px-3' 
   placeholder='password'
    ref={passref}
   readOnly/>
   <button className='px-2  bg-amber-700 text-white'
   onClick={copymethod} >Copy</button>
   
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {Setlength(e.target.value)}}
       />
       <label>Length: {length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={numall}
      id="isnumberallowed"
      onChange={()=>{
        setnumall((prev) => !prev);
      }} />
      <label htmlFor="isnumberallowed">Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox" 
      defaultChecked={charall}
      id="isspecialallowed"
      onChange={()=>{
        setcharall((prev) => !prev);
      }} />
      <label htmlFor="isspecialallowed">Characters</label>
      </div>
  </div>
 </div>
   
  )
}

export default App
