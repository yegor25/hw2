import { runDb } from "./db"
import { app } from "./settings"

const port = 3000




const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log("server running...")
    })
}
// const user = {
//     age: 18,
//     showAge(){
//         console.log(this.age)
//     }
// }
// const animal = {
//     age: 10,
//     showAge(){
//         console.log(this.age)
//     }
// }

// setInterval(user.showAge,1000)
startApp()
const  items = [{"id":"65324b47199c1b4dc269c58c","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.879Z"},{"id":"65324b47199c1b4dc269c58b","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.468Z"},{"id":"65324b47199c1b4dc269c58a","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.053Z"},{"id":"65324b46199c1b4dc269c589","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:26.644Z"},{"id":"65324b46199c1b4dc269c588","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:26.149Z"},{"id":"65324b45199c1b4dc269c587","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:25.741Z"},{"id":"65324b45199c1b4dc269c586","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:25.325Z"},{"id":"65324b44199c1b4dc269c585","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.916Z"},{"id":"65324b44199c1b4dc269c584","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.508Z"},{"id":"65324b44199c1b4dc269c583","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.101Z"}]
console.log(items.length)
const items2 = [{"id":"65324b47199c1b4dc269c58c","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.879Z"},{"id":"65324b47199c1b4dc269c58b","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.468Z"},{"id":"65324b47199c1b4dc269c58a","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:27.053Z"},{"id":"65324b46199c1b4dc269c589","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:26.644Z"},{"id":"65324b46199c1b4dc269c588","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:26.149Z"},{"id":"65324b45199c1b4dc269c587","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:25.741Z"},{"id":"65324b45199c1b4dc269c586","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:25.325Z"},{"id":"65324b44199c1b4dc269c585","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.916Z"},{"id":"65324b44199c1b4dc269c584","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.508Z"},{"id":"65324b44199c1b4dc269c583","content":"length_21-weqweqweqwq","commentatorInfo":{"userId":"65324b3f199c1b4dc269c57b","userLogin":"lg-878628"},"createdAt":"2023-10-20T09:41:24.101Z"}]
console.log(items2.length)