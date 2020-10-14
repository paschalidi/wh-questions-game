import styled from "styled-components";
import useDimensions from "react-use-dimensions";
import { FunkyButton } from "../FunkyButton";

const CardStyles = styled.div`
  position: relative;
  padding: 2rem;
  box-shadow: 1rem 1rem 0 0 #222;
  width: 100%;
  margin: 2rem;
  background: #111;

  .center {
    text-align: center;
  }
`;

const FunkyDropdownButton = styled(FunkyButton)`
  color: #8bd76b;
`;

const FunkyDropdownMenu = styled.div`
  z-index: 1;
  position: absolute;
  transform: translateY(1vh);

  .selectorOptions {
    overflow: hidden;
    display: block;
    background-color: #000;
    border: 0.15rem solid #f54768;
    border-radius: 2rem;
    box-shadow: 0 0 5rem 1rem #000;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  .itemIcon,
  .itemLabel {
    display: block;
    padding: 0.25rem 1rem;
    pointer-events: none;
  }
  .itemLabel {
    -webkit-box-flex: 1;
    flex: 1;
    position: relative;
    z-index: 1;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    -webkit-transition: color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
    border-bottom: 0.15rem solid #f54768;
  }
  .item {
    cursor: pointer;
  }

  .item:hover {
    background: #f54768;
    color: white;
    transition: background-color ease 0.2s;

    .itemIcon {
      background: #011;
    }
  }
`;

const H1 = styled.h1`
  font-size: 1.5em;
  font-weight: normal;
  color: #f54768;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &::after {
    margin-left: 1rem;
  }

  &::before {
    margin-right: 1rem;
  }

  &::before,
  &::after {
    flex: 1;
    content: "";
    height: 0.15rem;
    background-color: #333;
  }
`;

const AVAILABLE_PLAYERS = {
  pizza: {
    name: "pizza",
    icon: "🍕",
    desc: "My favourite italian food",
  },
  tacos: {
    name: "tacos",
    icon: "🌮",
    desc: "My favourite Mexican food",
  },
  burger: {
    name: "burger",
    icon: "🍔",
    desc: "My favourite food from Mc donalds",
  },
  burrito: {
    name: "burrito",
    icon: "🌯",
    desc: "My favoute italian food",
  },
  sushi: {
    name: "sushi",
    icon: "🍣",
    desc: "My favoute italian food",
  },
};

export const CharacterDropdown = ({
  openMenu,
  openMenuId,
  menuId,
  players,
  selectPlayer,
}) => {
  const [ref, { width }] = useDimensions();

  const handlePlayerSelections = (name) => {
    selectPlayer({
      ...players,
      [menuId]: { ...AVAILABLE_PLAYERS[name], id: menuId },
    });
    openMenu(null);
  };

  return (
    <CardStyles>
      <FunkyDropdownButton
        ref={ref}
        onClick={() => {
          if (players[menuId].name) {
            return;
          }
          if (menuId === openMenuId) {
            return openMenu(null);
          }
          return openMenu(menuId);
        }}
      >
        {players[menuId].name ? players[menuId].name : "👉 Choose character 👈"}
      </FunkyDropdownButton>

      <FunkyDropdownMenu>
        {menuId === openMenuId && (
          <div style={{ width: width + 5 }}>
            <ul className="selectorOptions">
              {Object.values(AVAILABLE_PLAYERS).map(({ name, icon }) => (
                <li key={name}>
                  <div
                    className="item"
                    onClick={() => handlePlayerSelections(name)}
                  >
                    <span className="itemIcon ">{icon}</span>
                    <span className="itemLabel">{name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </FunkyDropdownMenu>
      <H1 style={{ paddingTop: 12, paddingBottom: 12 }}>How to choose</H1>
      <div>
        You want to choose your favourite food as a character to start the game.
      </div>
    </CardStyles>
  );
};
