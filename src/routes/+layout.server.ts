import type { LayoutServerLoad } from "./$types"
// import 

export const load: LayoutServerLoad = async (event) => {

  let session = await event.locals.getSession();

  // console.log(session);
  
  return {
    session: session,
  }
}