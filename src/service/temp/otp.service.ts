import { OTPDataAcces } from '../../DA';
import { generateOTP, emailTemplate } from '../../utils';
import { OTP, IOtp } from '../../types';



export class OTPService {
    constructor(
        private OTPDataAccess: OTPDataAcces
    ){}

    public async sendOTP(email: string): Promise<boolean>{
        try {
            await this.OTPDataAccess.deleteOTPByEmail(email)

            const otp = generateOTP();
            const newOTP = new OTP({ email, otp })
            await this.OTPDataAccess.addNewOTP(newOTP)

            const isSended = await emailTemplate(email,otp)
            
            if (!isSended) {
                return false;
            }

            return true;
        } catch (error) {
            throw error
        }
    }

    public async verifyOTP(otp: Omit<IOtp,"id" | "verified">): Promise<boolean>{
        try {
            const existingOTP = await this.OTPDataAccess.getOTPByOtp(otp)
    
            if (!existingOTP) {
                return false;
            }
    
            await this.OTPDataAccess.setOtpToVerified(otp);
            return true;
        } catch (error) {
            throw error
        }
    }
}