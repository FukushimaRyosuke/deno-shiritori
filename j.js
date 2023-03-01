console.log("お");

const o = asnyc () => {
    const response = await fetch("/shiritori");
    const json = await response.json();
    console.log(json);
  };