// async function getUser() {
//   try {
//     const user = database.findById(5);
//     return user.name;
//   } catch (err) {
//     console.error("Error occurred");
//   }
// }

// getUser();

// a) Why will the catch block NOT handle database errors in this code?
// b) Rewrite the function so errors are handled correctly using async/await.
// c) What type of error is this: synchronous or asynchronous?

// a) Because database.findById(5) is asynchronous and returns a Promise, but we are not awaiting it.
// 1️ findById() is called
// 2️ It immediately returns a Promise
// 3️ try block finishes instantly
// 4️ Later → database fails → Promise rejects
// 5️ catch block already finished

// b)

async function getUser() {
    try {
        const user = await database.findbyId(5);
        return user.name
    } catch (error) {
        console.error("Error occurred:", error)
    }
}

getUser();

//3) This is an asynchronous error.

// Why?

// Because it originates from a Promise-based async operation (database call).