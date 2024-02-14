import { useNavigate } from "react-router-dom";

export default function HistoryTableColumns() {
  return [
    {
      field: 'user',
      headerName: 'ID do Usuário',
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
      width: 100,
    },
    {
      field: "returned_at",
      headerName: "Devolvido em",
      width: 120,
    },
  ];
}
