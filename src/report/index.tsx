import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReport, fetchReport } from "../services/api";
import "./style.css";

const Report = () => {
  const [data, setData] = useState<any[]>([]);
  const handleGetReport = async () => {
    const res = await fetchReport();
    setData(res);
  };
  const handleDeleteReport = async (id: string) => {
    try {
      await deleteReport(id);
      handleGetReport();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  useEffect(() => {
    handleGetReport();
  }, []);
  const navigate = useNavigate();
  const colors = [
    { name: "Default", hex: "", isDefault: true },
    { name: "Red", hex: "#F44336" },
    { name: "Green", hex: "#4CAF50" },
    { name: "Blue", hex: "#2196F3" },
    { name: "Purple", hex: "#9C27B0" },
    { name: "Orange", hex: "#FF9800" },
  ];
  const [selectedColor, setSelectedColor] = useState(colors[0].hex);

  const handleChange = (event: any) => {
    setSelectedColor(event.target.value);
  };
  return (
    <Box p={3} marginTop={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Danh sách báo cáo</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
      </Box>
      <Grid2 container spacing={3}>
        {data.map((item) => (
          <Grid2 key={item.id}>
            <Card sx={{ width: 200, cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                onClick={() => navigate(`/edit/${item.id}`)}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Button onClick={() => handleDeleteReport(item.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <FormControl sx={{ minWidth: 120 }} size="small">
        {/* <InputLabel id="color-select-label">Chọn màu</InputLabel> */}
        <Select
          labelId="color-select-label"
          value={selectedColor}
          // label="Chọn màu"
          onChange={handleChange}
          renderValue={(selected) => {
            const color = colors.find((c) => c.hex === selected);
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {color?.hex ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: selected,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography>{color?.name}</Typography>
              </Box>
            );
          }}
        >
          {colors.map((color) => (
            <MenuItem key={color.name} value={color.hex}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {color.hex ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: color.hex,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography>
                  {color.name}
                  {color.hex && ` (${color.hex})`}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="color-select-label">Chọn màu</InputLabel>
        <Select
          labelId="color-select-label"
          value={selectedColor}
          label="Chọn màu"
          onChange={handleChange}
        >
          {colors.map((color) => (
            <MenuItem key={color.hex} value={color.hex}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {!color.isDefault && (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.hex,
                      border: "1px solid #ccc",
                      borderRadius: 2,
                    }}
                  />
                )}
                <span>{color.name}</span>
                {!color.isDefault && <span>({color.hex})</span>}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          labelId="color-select-label"
          value={selectedColor}
          onChange={handleChange}
          renderValue={(selected) => {
            const color = colors.find((c) => c.hex === selected) || colors[0]; // Mặc định là Default nếu không tìm thấy
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {color.hex ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: selected,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography>{color.name}</Typography>{" "}
                {/* Luôn hiển thị tên, kể cả Default */}
              </Box>
            );
          }}
        >
          {colors.map((color) => (
            <MenuItem key={color.name} value={color.hex}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {color.hex ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: color.hex,
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography>
                  {color.name}
                  {color.hex && ` (${color.hex})`}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Report;

const data = {
  intro: { type: "1", Product: "abc", name: "Khai" },
  Crimital: [
    { name: "abc.com", age: "8", adrress: "123 Abc" },
    { name: "abc1.com", age: "81", adrress: "123 Abc1" },
  ],
  Indicator: [
    { Ip: "1.1.10", domain: "abc.com" },
    { Ip: "1.1.11", domain: "abc1.com" },
  ],
};

const newData = Object.entries(data).map(([key, value]) => ({ [key]: value }));

console.log(JSON.stringify(newData, null, 2));

// Dữ liệu đầu vào
const detail = [
  {
    name: "Header 1",
    content: [
      { header: "header1", content: "content1" },
      { header: "header2", content: "content2" },
      { header: "header3", content: "content3" },
    ],
  },
  {
    name: "Header 2",
    content: [
      { header: "header1", content: "content1" },
      { header: "header2", content: "content2" },
      { header: "header3", content: "content3" },
    ],
  },
  {
    name: "Header 3",
    content: [
      { header: "header1", content: "content1" },
      { header: "header2", content: "content2" },
      { header: "header3", content: "content3" },
    ],
  },
];

// Hàm tạo header từ phần tử đầu tiên của content
const createHeader = (contentItem: { header: any; content?: string }) => ({
  b: [
    {
      pf: {
        bdrs: { tp: {}, lt: {}, rg: {}, bt: {}, h: {}, v: {} },
        lin: 0,
        fin: 0,
        stn: "Normal",
        lif: {},
      },
      cf: {
        b: true,
        ff: "Times New Roman",
        ffbi: "Times New Roman",
        ffa: "Times New Roman",
        ffnfe: "Times New Roman",
        fffe: "Times New Roman",
      },
      i: [
        {
          cf: {
            b: true,
            ff: "Times New Roman",
            bi: false,
            ffbi: "Times New Roman",
            ffa: "Times New Roman",
            ffnfe: "Times New Roman",
            fffe: "Times New Roman",
          },
          tlp: contentItem.header, // Lấy header từ content
        },
      ],
    },
  ],
  tcpr: {
    bdrs: { tp: {}, lt: {}, rg: {}, bt: {}, dd: {}, du: {}, h: {}, v: {} },
    sd: { bgc: "#d9d9d9", fgc: "empty", t: 0 },
    pw: 156,
    cw: 156,
    colsp: 1,
    rwsp: 1,
  },
  ci: 0,
});

// Hàm tạo row từ mỗi phần tử trong content
const createRow = (contentItem: { header?: string; content: any }) => ({
  b: [
    {
      pf: {
        bdrs: { tp: {}, lt: {}, rg: {}, bt: {}, h: {}, v: {} },
        lin: 0,
        fin: 0,
        stn: "Normal",
        lif: {},
      },
      cf: {
        b: true,
        ff: "Times New Roman",
        ffbi: "Times New Roman",
        ffa: "Times New Roman",
        ffnfe: "Times New Roman",
        fffe: "Times New Roman",
      },
      i: [
        {
          cf: {
            b: true,
            ff: "Times New Roman",
            bi: false,
            ffbi: "Times New Roman",
            ffa: "Times New Roman",
            ffnfe: "Times New Roman",
            fffe: "Times New Roman",
          },
          tlp: contentItem.content, // Lấy content từ content
        },
      ],
    },
  ],
  tcpr: {
    bdrs: { tp: {}, lt: {}, rg: {}, bt: {}, dd: {}, du: {}, h: {}, v: {} },
    sd: { bgc: "#d9d9d9", fgc: "empty", t: 0 },
    pw: 156,
    cw: 156,
    colsp: 1,
    rwsp: 1,
  },
  ci: 0,
});

// Tạo cấu trúc SFDT
const sfdt = {
  optimizeSfdt: true,
  sec: [
    {
      secpr: {
        pw: 612,
        ph: 792,
        lm: 72,
        rm: 72,
        tm: 72,
        bm: 72,
        hd: 36,
        fd: 36,
        dfp: 0,
        doep: 0,
        bi: 0,
        bc: "NewPage",
        enf: 2,
        fnf: 0,
        rif: 0,
        rie: 0,
        ifn: 1,
        ien: 1,
        pgns: "Arabic",
        ncols: 1,
        eqw: 1,
        lbtc: 0,
        cols: [],
      },
      b: detail.map((item) => ({
        r: [
          {
            c: [
              createHeader(item.content[0]), // Tạo header từ phần tử đầu tiên của content
              ...item.content.map((contentItem) => createRow(contentItem)), // Tạo rows từ tất cả phần tử trong content
            ],
          },
        ],
      })),
    },
  ],
};
