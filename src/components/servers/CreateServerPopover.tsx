import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CirclePlus } from "lucide-react";
import { createServer } from "@/lib/servers"
import { useNavigate } from "react-router-dom";

export default function CreateServerBackdrop() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");          // ← track input
  const canCreate = name.trim().length > 0;      // ← enable/disable
  const navigate = useNavigate();

  return (
    <>
      <Tooltip title="Add a Server" placement="right" arrow>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl bg-light-hover hover:bg-logo-hover flex items-center justify-center focus:outline-none"
          aria-label="Add a server"
        >
          <CirclePlus className="h-5 w-5" style={{ color: "white" }} />
        </button>
      </Tooltip>

      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: 420,
            minHeight: 220,
            bgcolor: "var(--color-dropdown)",
            color: "var(--color-dropdown-icons)",
            border: "1px solid var(--color-dropdown-border)",
            borderRadius: 7,
            p: 2,
            boxShadow: 24,
            display: "flex",
          }}
        >
          <div className="flex flex-col font-[600] px-2 text-white w-full gap-2">
            <div className="text-[30px] text-white w-full">Create a Server</div>

            <Box
              component="form"
              sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                label="Server name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{
                  sx: { color: "#fff", "&.Mui-focused": { color: "#fff" } },
                }}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff", caretColor: "#fff" },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                }}
              />
            </Box>

            <div className="flex justify-end">
            <button
              type="button"
              disabled={!canCreate}
              onClick={async () => {
                console.log(name)
                const server = await createServer(name.trim());
                setOpen(false);
                navigate(`/app/${server.id}`);
              }}
              className={canCreate
                ? "bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-lg"
                : "bg-light-hover text-white/50 px-3 py-1 rounded-lg cursor-not-allowed"}
            >
              Create
            </button>
            </div>
          </div>
        </Box>
      </Backdrop>
    </>
  );
}
