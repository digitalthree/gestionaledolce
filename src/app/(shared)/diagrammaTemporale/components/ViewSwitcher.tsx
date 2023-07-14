import React, {useState} from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
type ViewSwitcherProps = {
    isChecked: boolean;
    onViewListChange: (isChecked: boolean) => void;
    onViewModeChange: (viewMode: ViewMode) => void;
};
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
                                                              onViewModeChange,
                                                              onViewListChange,
                                                              isChecked,
                                                          }) => {
    const [filtriPeriodo, setFiltriPeriodo] = useState("Mese")
    return (
        <div className="ViewContainer">
            <button
                className={`Button`}
                style={{backgroundColor: filtriPeriodo === "Settimana" ? "#C2CCE5" : ""}}
                onClick={() => {
                    setFiltriPeriodo("Settimana")
                    onViewModeChange(ViewMode.Week)
                }}
            >
                Settimana
            </button>
            <button
                className="Button"
                style={{backgroundColor: filtriPeriodo === "Mese" ? "#C2CCE5" : ""}}
                onClick={() => {
                    setFiltriPeriodo("Mese")
                    onViewModeChange(ViewMode.Month)
                }}
            >
                Mese
            </button>
            <button
                className={`Button`}
                style={{backgroundColor: filtriPeriodo === "Anno" ? "#C2CCE5" : ""}}
                onClick={() => {
                    setFiltriPeriodo("Anno")
                    onViewModeChange(ViewMode.Year)
                }}
            >
                Anno
            </button>
            <div className="Switch">
                <label className="Switch_Toggle">
                    <input
                        type="checkbox"
                        defaultChecked={isChecked}
                        onClick={() => onViewListChange(!isChecked)}
                    />
                    <span className="Slider" />
                </label>
                Mostra la lista delle strutture
            </div>
        </div>
    );
};