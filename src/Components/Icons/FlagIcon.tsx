export type FlagStatus = 'done' | 'in progress' | 'reject';

const FLAG_COLORS: Record<FlagStatus, string> = {
  done: '#76CC8E',
  'in progress': '#FFA500', 
  reject: '#FF0000',        
};

export const FlagIcon = ({ status = 'done' }: { status?: FlagStatus }) => {
  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.4 2L9 0H0V17H2V10H7.6L8 12H15V2H9.4Z"
        fill={FLAG_COLORS[status]}
      />
    </svg>
  );
};