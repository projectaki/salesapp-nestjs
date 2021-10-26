// export const runIfIdle = (func: () => Promise<void>) => {
//   let isRunning = false;
//   let runFirstTime = true;
//   if(runFirstTime) {
//       runFirstTime = false;
//       isRunning = true;
//       await func();
//   }
//   return async () => {
//     if (!isRunning) {
//       isRunning = true;
//       console.log('running');
//       await func();
//       isRunning = false;
//     } else {
//       console.log('already running');
//     }
//   };
// };
