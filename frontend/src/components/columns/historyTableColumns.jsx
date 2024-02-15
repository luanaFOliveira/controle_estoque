export default function EquipmentHistoryTableColumns() {
  return [
    {
      field: "user",
      headerName: "ID do Usuário",
      width: 170,
      renderCell: (params) => params.value.user_id,
    },
    {
      field: "equipment_code",
      headerName: "Código do equipamento",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Criado em",
      width: 150,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },
    {
      field: "returned_at",
      headerName: "Data de Devolução",
      width: 150,
      valueFormatter: (params) => {
        if (params.value === null) {
          return "Em uso";
        }
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
    },
  ];
}
