import React, {useEffect, useState} from "react";
import {Container,} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {createEquipment, getEquipment, getEquipmentDetails, updateEquipment,} from "../../../services/equipmentService";
import {indexSectors} from "../../../services/sectorService";
import {UpsertEquipment} from "../../../components/Equipment/UpsertEquipment";
import { set } from "lodash";
import {toastConfirmation} from "../../../components/shared/ToastComponents";

const ManageEquipment = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [editLoading, setEditLoading] = useState(false);
    const [sectors, setSectors] = useState([]);
    const [equipmentBrands, setEquipmentBrands] = useState([]);
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    const [formData, setFormData] = useState({
        name: "", equipment_brand: "", equipment_type: "", sector: "",
    });
    const [initialEquipment, setInitialEquipment] = useState({
        sector: "", user: "",
    });

    useEffect(() => {
        getAllEquipmentInfos();
        getAllSectors();
    }, []);

    useEffect(() => {
        returnEquipment();
    }, [params.equipment_id]);

    const getAllSectors = async () => {
        const res = await indexSectors({})
        if (res) {
            setSectors(res.data);
        }
    };

    const getAllEquipmentInfos = async () => {
        const res = await getEquipmentDetails()
        if (res) {
            setEquipmentBrands(res.equipment_brands);
            setEquipmentTypes(res.equipment_types);
        }
    };

    const returnEquipment = async () => {
        if (params.equipment_id) {
            setEditLoading(true);
            const res = await getEquipment(params.equipment_id)
                .finally(() => {
                    setEditLoading(false);
                });
            if (res) {
                const equipment = res.data;
                setInitialEquipment({
                    sector: equipment.sector,
                    user: equipment.user,
                });
                setFormData({
                    name: equipment.name,
                    equipment_brand: equipment.brand,
                    equipment_type: equipment.type,
                    sector: equipment.sector,
                });
            }
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    };

    

    const handleUpdateEquipmentConfirmation = async (e) => {
        e.preventDefault();
        if(formData.sector !== initialEquipment.sector && initialEquipment.user != null){
            toastConfirmation({
                item: "O equipamento esta ativo, ao continuar ele sera desvinculado do usuario",
                handleClick: handleSubmit,
            })
        }else{
            handleSubmit();
        }
    };
    const handleSubmit = async () => {

        const trimmedName = formData.name.trim();
        if (trimmedName.length < 4 || trimmedName.length > 20) {
            toast.error("O nome do equipamento deve ter entre 4 e 20 caracteres.");
            return;
        }
        if (params.equipment_id) {
            const res = await updateEquipment({
                equipment_id: params.equipment_id, formData: formData,
            });
            if (res) {
                toast.success("Equipamento atualizado com sucesso!");
                navigate(`/equipments/${res.data.equipment_id}`);
            }
            
        } else {
            const res = await createEquipment(formData)
            if (res) {
                toast.success("Equipamento registrado com sucesso!");
                navigate(`/equipments/${res.data.equipment_id}`);
            }
        }
    };

    const handleTypeChange = (event, value) => {
        setFormData({
            ...formData, equipment_type: value.toUpperCase(),
        });
    };

    const handleBrandChange = (event, value) => {
        setFormData({
            ...formData, equipment_brand: value.toUpperCase(),
        });
    };

    return (<Container component="main" maxWidth="xs">
        <UpsertEquipment params={params} handleChange={handleChange} editLoading={editLoading}
                         equipmentBrands={equipmentBrands} equipmentTypes={equipmentTypes}
                         handleBrandChange={handleBrandChange} handleTypeChange={handleTypeChange}
                         handleSubmit={handleUpdateEquipmentConfirmation} sectors={sectors} formData={formData}/>
    </Container>);
};

export default ManageEquipment;
