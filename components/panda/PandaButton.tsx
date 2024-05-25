const PandaButton = ({ children, text, handleClick = () => { }, disabled = false }: any) => {
  return (
    <>
      <button className="text-text bg-overlay hover:bg-highlight flex gap-2 items-center rounded-full  px-3 py-2 mobile:px-5 mobile:py-2 text-base font-bold text-lg mobile:text-xl z-40" disabled={disabled}
        onClick={handleClick}>
        {children}
      </button>
    </>
  );
};

export default PandaButton;
