const ThemeButton = ({ text }: any) => {
  return (
    <>
      <button className="bg-rose-600 px-3 py-2 sm:px-5 sm:py-2 text-white font-semibold rounded-full text-sm sm:text-lg">
        {text}
      </button>
    </>
  );
};

export default ThemeButton;
