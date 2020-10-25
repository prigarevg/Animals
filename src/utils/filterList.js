//Фильтрация массива по рдкости, классу и континету
export const filterList = (
  list,
  rarity,
  searchString,
  //Поля, по которым осуществляется фильтрация
  searchFields = ["class", "continent"]
) => {
  return list.filter(
    (item) =>
      (item.rare === rarity || !rarity) &&
      checkFields(item, searchString, searchFields)
  );
};

//Проверка на совпадение значений
const checkFields = (obj, searchString, searchFields) => {
  if (searchString) {
    let flag = false;

    //поиск совпадений по регулярному выражению

    const pattern = RegExp(`^${searchString}`, "i");

    for (let i = 0; i < searchFields.length; i++) {
      if (pattern.test(obj[searchFields[i]])) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  return true;
};
