import { prisma } from '../../client/prisma';
import { hashPassword } from '../../helpers/passwordHelper';

export async function up() {

	const superAdminRole = await prisma.user.findFirst({
		where: {
			role:'SUPERADMIN'
		},
	});

	if (!superAdminRole) {
	 await prisma.user.create({
			data: {
				email: process.env.ADMIN_EMAIL || 'superadmin@benzatine.com',
				password: await hashPassword(
					process.env.ADMIN_PASSWORD || 'superadmin@2023'
				),
			 name: 'SUPERADMIN',
			 role:'SUPERADMIN'
			},
		});
	}

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function down() {
	// do nothing
}
