"use client"

type TProps={
    params:{
        adminId:string
    }
}
const AdminUpdatedPage = ({params}:TProps) => {
    console.log(params?.adminId)
  return (
    <div>AdminUpdatedPage</div>
  )
}

export default AdminUpdatedPage

