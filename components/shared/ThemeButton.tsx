const ThemeButton = ({ text, handleClick = () => { }, disabled=false }: any) => {
    return (
        <>
            <button className="bg-rose-600 px-3 py-2 sm:px-5 sm:py-2 text-white font-semibold rounded-full text-sm sm:text-lg" disabled={disabled}
                onClick={handleClick}>
                {text}
            </button>
        </>
    );
};

export default ThemeButton;
