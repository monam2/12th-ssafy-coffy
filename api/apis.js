const baseURL = process.env.NEXT_PUBLIC_NEXTAPI_URL;

async function getAllMenu() {
  try {
    const res = await fetch(baseURL + "/menu");
    const result = await res.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function getMenuByCategory(name) {
  try {
    const res = await fetch(baseURL + `/menu/${name}`);
    const result = await res.json();
    return result;
  } catch (e) {
    console.log(e);
  }
}



export { getAllMenu, getMenuByCategory };
