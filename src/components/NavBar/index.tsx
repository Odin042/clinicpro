import React, { useState } from "react";
import {
  Typography,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../assets/clinic360logo.png";
import * as S from "./styles";
import { useTheme } from "@mui/material/styles";

export const Navbar = ({ sections }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    handleMenuClose();
  };

  return (
    <S.Container>
      <S.StyledAppBar>
        <S.LogoWrapper>
          <img src={Logo} alt="Logo" />
        </S.LogoWrapper>

        {!isMobile && (
          <>
            <S.MenuBox>
              <MenuItem onClick={() => scrollToSection(sections.homeRef)}>
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => scrollToSection(sections.aboutRef)}>
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  Quem somos
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection(sections.profissionaisRef)}
              >
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  Benefícios
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection(sections.bannerFuctionRef)}
              >
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  O que somos
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => scrollToSection(sections.valoresRef)}>
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  Valores
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => scrollToSection(sections.faqRef)}>
                <Typography
                  textAlign="center"
                  style={{ color: theme.palette.text.primary }}
                >
                  FAQ
                </Typography>
              </MenuItem>
            </S.MenuBox>
            <S.ButtonWrapper>
              <S.StyledButton theme={theme}>Cadastre-se</S.StyledButton>
              <S.StyledButton theme={theme}>Login</S.StyledButton>
            </S.ButtonWrapper>
          </>
        )}

        {isMobile && (
          <S.MenuIconButton onClick={handleMenuOpen} aria-label="open menu">
            <MenuIcon />
          </S.MenuIconButton>
        )}
      </S.StyledAppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
      >
        <MenuItem onClick={() => scrollToSection(sections.homeRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            Home
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection(sections.aboutRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            Quem somos
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection(sections.profissionaisRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            Benefícios
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection(sections.bannerFuctionRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            O que somos
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection(sections.valoresRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            Valores
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection(sections.faqRef)}>
          <Typography
            textAlign="center"
            style={{ color: theme.palette.text.primary }}
          >
            FAQ
          </Typography>
        </MenuItem>
        {isMobile && (
          <>
            <MenuItem onClick={handleMenuClose}>
              <Button variant="contained" color="primary" fullWidth>
                Cadastre-se
              </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Button variant="contained" color="secondary" fullWidth>
                Login
              </Button>
            </MenuItem>
          </>
        )}
      </Menu>
    </S.Container>
  );
};

export default Navbar;
