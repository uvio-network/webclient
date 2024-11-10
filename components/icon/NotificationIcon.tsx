import { BaseIcon } from "@/components/icon/BaseIcon";

interface Props {
  className?: string;
  size?: string;
  unread: Boolean;
}

//   read https://fonts.google.com/icons?selected=Material+Symbols+Outlined:notifications:FILL@0;wght@500;GRAD@200;opsz@48&icon.query=notification&icon.size=24&icon.color=%23e8eaed
// unread https://fonts.google.com/icons?selected=Material+Symbols+Outlined:notifications_unread:FILL@0;wght@500;GRAD@0;opsz@24&icon.query=dot&icon.size=24&icon.color=%235f6368&icon.style=Outlined
export const NotificationIcon = (props: Props) => {
  return (
    <BaseIcon
      className={props.className}
      size={props.size}
      viewBox="0 -960 960 960"
    >
      <g>
        {props.unread ? (
          <path fill="currentColor" d="M480.24-69.24q-34.18 0-58.53-24.27-24.34-24.27-24.34-58.36h165.5q0 34.2-24.27 58.41-24.28 24.22-58.36 24.22ZM480-498.8ZM151.87-191.87v-91H229v-271.87q0-86.11 51.32-153.6 51.31-67.49 134.18-88.2v-26.09q0-27.29 19.1-46.4 19.11-19.1 46.4-19.1 25.24 0 43.58 16.78 18.33 16.78 20.49 41.31v9.89q-14.83 25.58-21.15 53.37-6.31 27.78-3.64 56.8-9.82-1.9-19.15-3.33-9.33-1.43-20.13-1.43-66 0-113 47t-47 113v271.87h320v-252.46q20.63 9.44 44 14.18t47 3.54v234.74h77.13v91H151.87Zm572.2-405.26q-52.3 0-88.9-36.6-36.6-36.61-36.6-88.9 0-52.29 36.6-88.9 36.6-36.6 88.9-36.6 52.29 0 88.89 36.6 36.61 36.61 36.61 88.9 0 52.29-36.61 88.9-36.6 36.6-88.89 36.6Z" />
        ) : (
          <path fill="currentColor" d="M142.8-182.8v-77.31h77.85v-298.54q0-88.89 51.5-160.38t138.94-91.73v-17.76q0-27.73 20.1-48.44 20.11-20.71 48.83-20.71t48.81 20.71q20.08 20.71 20.08 48.44v17.76q87.2 19.76 139.44 91.16 52.24 71.41 52.24 160.95v298.54h77.84v77.31H142.8Zm337.96-317.48Zm-.68 443.95q-35.83 0-61.08-25.4-25.24-25.4-25.24-61.07h172.72q0 36.23-25.44 61.35-25.43 25.12-60.96 25.12ZM297.96-260.11h365.08v-298.44q0-75.62-53.72-129-53.72-53.38-129.4-53.38t-128.82 53.4q-53.14 53.41-53.14 128.88v298.54Z" />
        )}
      </g>
    </BaseIcon>
  );
};
