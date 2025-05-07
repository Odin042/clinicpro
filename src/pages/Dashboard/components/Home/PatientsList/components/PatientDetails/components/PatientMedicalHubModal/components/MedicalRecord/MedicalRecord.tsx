import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useCreateRecord from "../../../../../../../../../../../hooks/useCreateMedicalRecord";

export const MedicalRecord = () => {
  const { id: patientId } = useParams<"id">();
  const navigate = useNavigate();

  const createRecord = useCreateRecord(patientId!);
  const [content, setContent] = useState("");

  const handleSave = async () => {
    try {
      await createRecord.mutateAsync({ content });
      toast.success("Prontuário salvo com sucesso");
      setContent("");
      navigate(0)
    } catch {
      toast.error("Erro inesperado, tente novamente");
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight={700}>
        Preencha o prontuário
      </Typography>

      <ReactQuill
        value={content}
        onChange={setContent}
        style={{ height: 300 }}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      />

      <LoadingButton
        variant="contained"
        loading={createRecord.isPending}
        onClick={handleSave}
      >
        Salvar
      </LoadingButton>
      <Button
        variant="outlined"
        onClick={() => navigate(0)} 
      >
        Voltar
      </Button>
    </Stack>
  );
};
