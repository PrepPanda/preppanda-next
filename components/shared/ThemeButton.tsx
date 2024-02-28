const ThemeButton = ({ text, handleClick = () => { }, disabled=false }: any) => {
    return (
        <>
            <button className="bg-love px-3 py-2 sm:px-5 sm:py-2 text-base font-bold rounded-full text-lg sm:text-xl z-40" disabled={disabled}
                onClick={handleClick}>
                {text}
            </button>
        </>
    );
};

export default ThemeButton;
