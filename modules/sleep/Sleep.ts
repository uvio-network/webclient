// Sleep can be called like shown below in order to wait for the specified
// amount of time.
//
//     await Sleep(60 * 1000);
//
export const Sleep = async (mil: number) => {
  await new Promise((fnc) => setTimeout(fnc, mil));
};
