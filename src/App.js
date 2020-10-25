import React, { useEffect, useState } from "react";
import "./App.css";
import { groupBy } from "./utils/groupBy";
import { fauna } from "./constants/fauna";
import { filterList } from "./utils/filterList";

function App() {
  const [animalList, setAnimalList] = useState(fauna);
  const [groupedAnimalList, setGroupedAnimalList] = useState(null);
  const [searchString, setSearchString] = useState("");
  const [isRare, setRarity] = useState(false);

  //Фильтрация сгруппированного массива

  useEffect(() => {

    //Фильтрация

    const filteredAnimalList = filterList(animalList, isRare, searchString);

    //Группировка

    setGroupedAnimalList(groupBy(filteredAnimalList, "class"));
  }, [animalList, isRare, searchString]);

  //Обработчик событий чекбокса (фильтрация по редкости)

  const handleRarityChange = (evt) => {
    setRarity(evt.target.checked);
  };

  //Обработчик событий строки поиска (фильтрация по классу животных и континенту обитания)

  const handleSearchStringChange = (evt) => {
    setSearchString(evt.target.value);
  };

  //Рендеринг полученного списка

  const renderList = () => {
    if (groupedAnimalList) {
      const keys = Object.keys(groupedAnimalList);

      if (keys.length) {
        return keys.map((key, index) => (
          <div className="animals__group" key={index}>
            <h3>{key}</h3>
            <div className="animals__group__list">
              {groupedAnimalList[key].map((animal) => (
                <div className="animal">
                  <p className={`animal__name ${animal.rare ? "rare" : null}`}>
                    {animal.name}
                  </p>
                  <p className="animal__continent">{animal.continent}</p>
                </div>
              ))}
            </div>
          </div>
        ));
      }

      return <h3 className="animals__not-found">Ничего не найдено</h3>;
    }

    return null;
  };

  //Всегда отображаемые элементы на странице

  return (
    <div className="animals">
      <div className="animals__controls">
        <input
          type="text"
          value={searchString}
          onChange={handleSearchStringChange}
          placeholder="Искать..."
          className="animals__controls__search"
        />

        <label className="animals__controls__rarity">
          Только редкие
          <input
            type="checkbox"
            checked={isRare}
            onChange={handleRarityChange}
          />
        </label>
      </div>

      <div className="animals__list">
        <div className="animals__list__head">
          <p>Континент</p>
          <p>Наименование</p>
        </div>

        <div className="animals__list__body">{renderList()}</div>
      </div>
    </div>
  );
}

export default App;
