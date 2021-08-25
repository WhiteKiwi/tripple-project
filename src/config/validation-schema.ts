import Joi, { Types as JoiTypes } from 'joi'
import { isArray } from 'lodash'

import { Environment } from '../lib/types'

const DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS: MakeJoiSchemaParameters = {
	type: 'string',
	allowEmpty: true,
	requiredOnDeployment: true,
}

export default Joi.object({
	PORT: makeJoiSchema({
		type: 'number',
		requiredOnDeployment: false,
	}),
	ENVIRONMENT: makeJoiSchema({
		valid: Object.values(Environment),
		requiredOnDeployment: false,
	}),
	TYPEORM_HOST: makeJoiSchema(),
	TYPEORM_PORT: makeJoiSchema({ type: 'number' }),
	TYPEORM_DATABASE: makeJoiSchema(),
	TYPEORM_USERNAME: makeJoiSchema(),
	TYPEORM_PASSWORD: makeJoiSchema(),
})

// Joi schema를 만듬
type MakeJoiSchemaParameters = {
	type?: JoiTypes
	allowEmpty?: boolean
	valid?: any[]
	requiredOnDeployment?: boolean
}
function makeJoiSchema({
	type = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.type,
	allowEmpty = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.allowEmpty,
	valid,
	requiredOnDeployment = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.requiredOnDeployment,
}: MakeJoiSchemaParameters = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS): Joi.AnySchema {
	if (!type) type = 'string'
	let schmea = Joi[type]()

	// istanbul ignore next line
	if (allowEmpty) schmea = schmea.empty('')

	// valid value
	if (isArray(valid)) schmea = schmea.valid(...valid)

	// 배포 환경에서 필수 여부
	if (requiredOnDeployment)
		schmea = schmea.when('ENVIRONMENT', [
			{
				is: Environment.PRODUCTION,
				then: Joi[type]().required(),
			},
			{
				is: Environment.STAGING,
				then: Joi[type]().required(),
			},
		])
	return schmea
}
