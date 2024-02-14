
export default function UserHistoryTableColumns() {
  return [
    {
      field: "user",
      headerName: "Usuário",
      width: 70,
    },
    {
      field: "equipment_code",
      headerName: "Código do equipamento",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Criado em",
      width: 100,
    },
    {
      field: "returned_at",
      headerName: "Devolvido em",
      width: 120,
    },
  ];
}



