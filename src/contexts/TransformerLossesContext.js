import { createContext, useCallback, useState, useMemo } from "react";
import { Dot } from "recharts";

export const TransformerLossesContext = createContext();

export function TransformerLossesProvider({ children }) {
    const [radioValue, setRadioValue] = useState('all');
    const [losses, setLosses] = useState([]);
    const [baseDot, setBaseDot] = useState();
    const [hasRun, setHasRun] = useState(false);

    const handleSetRadioValue = useCallback((newValue) => {
        setRadioValue(newValue);
    }, []);

    const handleSetLosses = useCallback((newLosses) => {
        setLosses(newLosses);
    }, []);


    const handleRadioChange = (e) => {
        handleSetRadioValue(e.target.value);
        setHasRun(false)
    };

    const renderDot = useMemo(() => (props) => {
        const { cx, cy, payload } = props;
        if (payload.x === baseDot) {
            return (
                <Dot cx={cx} cy={cy} r={4} stroke="blue" fill="blue" strokeWidth={2} />
            );
        }
        return null;
    }, [baseDot]);

    const ctx = {
        radioValue,
        losses,
        handleSetLosses,
        setBaseDot,
        hasRun,
        setHasRun,
        handleRadioChange,
        renderDot
    };

    return (
        <TransformerLossesContext.Provider value={ctx}>
            {children}
        </TransformerLossesContext.Provider>
    );
};