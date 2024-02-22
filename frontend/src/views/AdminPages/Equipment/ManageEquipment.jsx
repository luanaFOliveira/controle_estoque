import React, {useEffect, useState} from "react";
import {Container,} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {createEquipment, getEquipment, getEquipmentDetails, updateEquipment,} from "../../../services/equipmentService";
import {errorToast} from "../../../services/api";
import {indexSectors} from "../../../services/sectorService";
import {UpsertEquipment} from "../../../components/Equipment/UpsertEquipment";

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

    useEffect(() => {
        getAllEquipmentInfos();
        getAllSectors();
    }, []);

    useEffect(() => {
        returnEquipment();
    }, [params.equipment_id]);

    const getAllSectors = async () => {
        try {
            await indexSectors({})
                .then((res) => {
                    setSectors(res.data);
                });
        } catch (error) {
            console.error(error);
            errorToast(error);
        }
    };

    const getAllEquipmentInfos = async () => {
        try {
            await getEquipmentDetails()
                .then((res) => {
                    setEquipmentBrands(res.equipment_brands);
                    setEquipmentTypes(res.equipment_types);
                });
        } catch (error) {
            console.error(error);
            errorToast(error);
        }
    };

    const returnEquipment = async () => {
        if (params.equipment_id) {
            setEditLoading(true);
            try {
                await getEquipment(params.equipment_id)
                    .then((res) => {
                        const equipment = res.data;
                        setFormData({
                            name: equipment.name,
                            equipment_brand: equipment.brand,
                            equipment_type: equipment.type,
                            sector: equipment.sector,
                        });
                    });
            } catch (error) {
                errorToast(error);
                console.error(error);
            } finally {
                setEditLoading(false);
            }
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedName = formData.name.trim();
        if (trimmedName.length < 4 || trimmedName.length > 20) {
            toast.error("O nome do equipamento deve ter entre 4 e 20 caracteres.");
            return;
        }
        if (params.equipment_id) {
            try {
                await updateEquipment({
                    equipment_id: params.equipment_id, formData: formData,
                }).then((res) => {
                    toast.success("Equipamento atualizado com sucesso!");
                    navigate(`/equipments/${res.data.equipment_id}`);
                });
            } catch (error) {
                console.error(error);
                errorToast(error);
            }
        } else {
            try {
                await createEquipment(formData)
                    .then((res) => {
                        toast.success("Equipamento registrado com sucesso!");
                        navigate(`/equipments/${res.data.equipment_id}`);
                    });
            } catch (error) {
                console.error(error);
                errorToast(error);
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
                         handleSubmit={handleSubmit} sectors={sectors} formData={formData}/>
    </Container>);
};

export default ManageEquipment;
