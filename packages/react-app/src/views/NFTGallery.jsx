import { Button, Card, Checkbox, DatePicker, Divider, Form, Input, InputNumber, Progress, Select, Slider, Spin, Switch } from "antd";
import { useContractReader } from "eth-hooks";
import Countdown from 'react-countdown';
import ReactTooltip from "react-tooltip";
import { Address } from "../components";

export default function NFTGallery({
    address,
    mainnetProvider,
    localProvider,
    yourLocalBalance,
    price,
    tx,
    readContracts,
    writeContracts,
    userHabits,
    allHabits
}) {

    const tokenUri1 = useContractReader(readContracts, "Habit", "tokenURI", [0]);
    const base64Json = tokenUri1 && tokenUri1.slice(29);
    const imageBase64 = base64Json && (JSON.parse(atob(base64Json)).image);

    return (
        <div className="nft-gallery">
            <div>
                <img style={{height: 800}} src={`${imageBase64}`} />
            </div>
        </div>
    );
}