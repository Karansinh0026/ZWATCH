// this is used to solve the await problem


// using try catch method
// const asynchandler = (func) => async(req,res,next) =>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             sucess:false,
//             message:err.message
//         })
//     }
// }


// Using promise 
const asynchandler = (requesthandler)=>{
    return (req,res,next) =>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>{next(err)})
    }
}



export {asynchandler}