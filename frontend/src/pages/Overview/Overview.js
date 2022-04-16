import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Overview() {
  const location = useLocation();
  const [references, setReferences] = useState(null);
  const [fileName, setFileName] = useState("");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    if (location) {
      console.log(location.state.references);
      setReferences(location.state?.references);
      setFileName(location.state?.file_name);
    }
  }, [location]);

  return (
    <div className="overview">
      <p style={{ fontSize: "32px" }}>Publication name: {fileName}</p>
      <ul>
        {references &&
          references
            .filter((x) => x.author)
            .map((x, idx) => {
              return (
                <Accordion
                  expanded={expanded === `panel${idx}`}
                  onChange={handleChange(`panel${idx}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${idx}1bh-content`}
                    id={`panel${idx}bh-header`}
                  >
                    <Typography
                      noWrap
                      sx={{ width: "33%", flexShrink: 0, textAlign: "left" }}
                    >
                      {[...x.misc]}
                    </Typography>
                    <Typography
                      sx={{
                        width: "25%",
                        color: "text.secondary",
                      }}
                    >
                      Grade maybe
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{x.raw_ref}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
      </ul>
    </div>
  );
}
