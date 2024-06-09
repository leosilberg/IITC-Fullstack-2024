import  { useState } from "react"
function Comp() {
  console.log("Render")
  const [data ,setData]=useState([])
  console.log(data)
  function add(){
    setData((prevData)=>prevData.concat("Food"))
    setData((prevData)=>prevData.concat("Food2"))
  }
  return (
    <>
      {data.length === 0 ? (
        <div className={data.length === 0 ? "active" : ""} onClick={add}>
          No Data
        </div>
      ) : (
        <>
          <div>{data}</div>
        </>
      )}
    </>
  );
}
export default Comp;
