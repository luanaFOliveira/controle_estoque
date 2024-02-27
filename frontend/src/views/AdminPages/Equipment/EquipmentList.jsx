import React, {useEffect, useState} from "react";
import {Button, CircularProgress, Container} from "@mui/material";
import BaseTable from "../../../components/shared/BaseTable";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import {indexEquipments,getEquipmentDetails} from "../../../services/equipmentService";
import EquipmentTableColumns from "../../../components/columns/EquipmentTableColumns";
import FilterBox from '../../../components/shared/FilterBox';

export default function EquipmentList() {
    const navigate = useNavigate();
    const [equipments, setEquipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [firstLoading, setFirstLoading] = useState(true);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0, pageSize: 10,
    });
    const [filter, setFilter] = useState({
        search: "none", availability: "all",equipmentBrand: "all",equipmentType: "all"
    });

    const columnsEquip = EquipmentTableColumns({user_admin: true});

    const [equipmentsBrands, setEquipmentsBrands] = useState([]);
    const [equipmentsTypes, setEquipmentsTypes] = useState([]);

    useEffect(() => {
        fetchEquipments();
    }, [paginationModel.page, filter]);

    useEffect(() => {
        fetchEquipmentsDetails();
    }, []);

    const fetchEquipments = async () => {
        setIsLoading(true);
        const page = paginationModel.page + 1;
        const res = await indexEquipments({
            page, availability: filter.availability, search: filter.search, brand: filter.equipmentBrand, type: filter.equipmentType
        }).finally(() => {
            setIsLoading(false);
            setFirstLoading(false);
        })
        if (res) {
            setEquipments(res.data);
            setRowCount((prevRowCountState) => res.meta.total ?? prevRowCountState);
        }
    };

    const fetchEquipmentsDetails = async () => {
        const res = await getEquipmentDetails();
        if (res) {
            setEquipmentsBrands(res.equipment_brands);
            setEquipmentsTypes(res.equipment_types);
        }
    };


    const handleSearch = (search) => {
        setFilter((prevFilter) => ({...prevFilter, search}));
    };

    const handleAvailabilityChange = (availability) => {
        setFilter((prevFilter) => ({...prevFilter, availability}));
    };

    const handleBrandChange = (equipmentBrand) => {
        setFilter((prevFilter) => ({...prevFilter, equipmentBrand}));
    };

    const handleTypeChange = (equipmentType) => {
        setFilter((prevFilter) => ({...prevFilter, equipmentType}));
    };

    return (<Container sx={{mt: 5, pr:0.5}}>
        <Button
            variant="contained"
            sx={{mb: 2}}
            onClick={() => navigate("/new-equipment")}
        >
            Registrar novo equipamento
        </Button>
        {firstLoading ? (<Grid item container justifyContent="center">
            <CircularProgress/>
        </Grid>) : (<>
            <FilterBox onSearch={handleSearch} onAvailabilityChange={handleAvailabilityChange}
                       disponibility={true} equipmentBrand={true} onBrandChange={handleBrandChange} brandLabels={equipmentsBrands} equipmentType={true} onTypeChange={handleTypeChange} typeLabels={equipmentsTypes}
                       requestMotive={false}
                       label='Pesquisar Código do equipamento ou nome do equipamento'
                       disponibilityLabels={[ "Não disponivel","Disponivel"]}/>
            <BaseTable
                rows={equipments}
                columns={columnsEquip}
                getRowId={(row) => row.equipment_id}
                rowCount={rowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                isLoading={isLoading}
            />
        </>)}
    </Container>);
}
