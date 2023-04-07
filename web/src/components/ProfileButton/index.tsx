import { ProfileButtonProps } from "../../types/components/profileButton";
import { Container } from "./styles";

export default function ProfileButton({ picture_profile, main_name, onClick }: ProfileButtonProps) {
  return (
    <Container onClick={onClick}>
      <img src={picture_profile} alt={`Foto de perfil de ${main_name}`} />
    </Container>
  )
}