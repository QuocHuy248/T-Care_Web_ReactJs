import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { element } from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));
function formatCurrency(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseFloat(price));
}
export function ServiceIndexUser({ value, setCheckButtonService, checkButtonService }) {
  return (
    <HtmlTooltip
      key={value.id}
      placement="right"
      title={
        <React.Fragment>
          <Typography color="inherit">
            {value.description.split(".").map(
              (sentence, index) =>
                sentence.length > 0 && (
                  <span key={index} className="mx-3">
                    - {sentence.trim()}
                    <br />
                  </span>

                )
            )}
            <div style={{height:"1px", backgroundColor:"#919191", marginTop:"5px"}}></div>
           <div style={{marginLeft:"50%",color:"orangered"}}>Giá dịch vụ: {formatCurrency(value.price)}</div>
          </Typography>
        </React.Fragment>
      }
    >
      <Button
        className={`index-user-body-service-render${
          checkButtonService === value.name ? "-active" : ""
        }`}
        onClick={() => setCheckButtonService(value.name)}
      >
        {value.name}
      </Button>
    </HtmlTooltip>
  );
}
