import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./themeSlice";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <label className="relative cursor-pointer w-10 h-5 bg-gray-400 rounded-full flex items-center sm:w-12 sm:h-6">
      <input
        type="checkbox"
        onChange={() => dispatch(toggleTheme())}
        checked={theme === "dark"}
        className="hidden peer"
      />
      <span className="absolute left-1 w-3 h-3.5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5 sm:peer-checked:translate-x-7 peer-checked:bg-blue-500"></span>
    </label>
  );
};

export default ThemeToggle;
